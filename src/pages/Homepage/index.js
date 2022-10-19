import React from "react"
import { Button, Input, Spin } from "antd"
import http from "service/httpService"
import parser from "node-html-parser"
import "./styles.scss"

const Homepage = () => {
    const [loading, setLoading] = React.useState(false)
    const [URL, setURL] = React.useState("")
    const [displayName, setDisplayName] = React.useState("")
    const [profileImage, setProfileImage] = React.useState("")

    const resetState = () => {
        setDisplayName("")
        setProfileImage("")
    }

    const handleSubmit = () => {
        setLoading(true)
        http.get(URL)
            .then((response) => {
                let html = response.data
                let displayName = parser.parse(html).querySelector(".fs-headline2").innerHTML.toString()
                if (displayName) {
                    displayName = displayName.trim()
                    setDisplayName(displayName)
                    parser
                        .parse(html)
                        .querySelectorAll("img")
                        .forEach((img) => {
                            let imgSrc = img.rawAttrs
                            if (imgSrc.includes(displayName)) {
                                var yourRegex = /src="([^">]+)/g
                                var match = yourRegex.exec(imgSrc)
                                setProfileImage(match[1])
                            }
                        })
                }
            })
            .catch(resetState)
            .finally(() => setLoading(false))
    }

    const onUrlChange = (url) => {
        if (url.includes("https://stackoverflow.com/")) {
            url = url.replace("https://stackoverflow.com/", "")
        }
        setURL(url)
    }

    return (
        <div className="homepage-conatiner">
            <div className="conatiner">
                <div className="content">
                    <div className="user-input">
                        <Input
                            value={URL}
                            onChange={({ target }) => onUrlChange(target.value)}
                            addonBefore="https://stackoverflow.com/"
                        />
                        <div className="submit-button">
                            <Button type="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                    {loading ? (
                        <div className="spinner">
                            <Spin />
                        </div>
                    ) : (
                        <>
                            {profileImage && <img className="display-image" src={profileImage} />}
                            {displayName && <span className="display-name">{displayName}</span>}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Homepage
