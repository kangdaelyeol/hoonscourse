import React, { useEffect, useRef, useState } from 'react'
import Styles from './temple.module.css'

// Scene1을 위한 이미지
import img1 from '../imgs/img1.png'
import img2 from '../imgs/img2.png'

const imgs = [img1, img2]

export default function Temple() {
    const [imgInfo, setImgInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const cRef = useRef()
    const wRef = useRef()
    const s1Ref = useRef()

    const onTemScroll = (e) => {}

    useEffect(() => {
        if (!cRef || !wRef || !s1Ref || isLoading) return
        console.log(imgInfo)
        const vHeight = wRef.current.scrollHeight
        const vWidth = wRef.current.scrollWidth
        cRef.current.width = vWidth
        cRef.current.height = vHeight
        const ctx = cRef.current.getContext('2d')
        ctx.drawImage(imgInfo[0]?.img, 0, 0, 360, 600)
    }, [cRef, wRef, s1Ref, isLoading, imgInfo])

    useEffect(() => {
        const onWindowLoad = () => {
            setIsLoading(false)
        }
        imgs.forEach((src) => {
            const img = new Image()
            img.src = src
            img.onload = (e) => {
                setImgInfo((v) => [
                    ...v,
                    {
                        img: e.target,
                        src: src,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                    },
                ])
            }
        })
        window.addEventListener('load', onWindowLoad)

        return () => {
            window.removeEventListener('load', onWindowLoad)
        }
    }, [])

    return (
        <div className={Styles.container}>
            <div ref={wRef} className={Styles.wrapper}>
                {isLoading ? (
                    'Loading...'
                ) : (
                    <div
                        ref={s1Ref}
                        className={Styles.s1}
                        onScroll={onTemScroll}
                    >
                        <canvas className={Styles.mycanvas} ref={cRef}></canvas>
                    </div>
                )}
            </div>
        </div>
    )
}
