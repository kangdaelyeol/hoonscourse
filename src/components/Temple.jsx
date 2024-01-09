import React, { useEffect, useRef, useState } from 'react'
import Styles from './temple.module.css'

// Scene1을 위한 이미지
import img1 from '../imgs/img1.png'
import img2 from '../imgs/img2.png'

const imgs = [img1, img2]

const drawImageInCanvas = (ctx, ratio, motion, image) => {
    ctx.clearRect(0, 0, 360, 800)
    const boundary = (motion.paintRatio[1] + motion.removeRatio[0]) / 2

    // 이미지 그려야할 x, y 구하기 칠하기
    const cX = motion.paintX[1] - motion.paintX[0]
    const cY = motion.paintY[1] - motion.paintY[0]
    const cRange = motion.paintRatio[1] - motion.paintRatio[0]
    const rRange = motion.removeRatio[1] - motion.removeRatio[0]

    let pR = (ratio - motion.paintRatio[0]) / cRange
    // 현재 진행 씬 ratio - 사라질 모션이 시작되는 ratio 시점 / 사라지는 모션의 범위
    let rRatio = (ratio - motion.removeRatio[0]) / rRange

    if (pR < 0) pR = 0
    if (pR > 1) pR = 1
    if (rRatio < 0) rRatio = 0
    if (rRatio > 1) rRatio = 1

    const pX = motion.paintX[0] + cX * pR
    const pY = motion.paintY[0] + cY * pR

    if (ratio < boundary) {
        // Draw In
        ctx.drawImage(image, 0, 0, pR * 1024, 1024, 0, 0, pX, 800)
    } else {
        // DrawOut
        ctx.drawImage(
            image,
            rRatio * 1024,
            0,
            1024 - rRatio * 1024,
            1024,
            360 * rRatio,
            0,
            360 - 360 * rRatio,
            800,
        )
    }
}

const imgMotion = {
    paintX: [0, 360],
    paintY: [100, 800],
    paintRatio: [0, 0.2],
    removeRatio: [0.3, 0.5],
}

export default function Temple() {
    const [imgInfo, setImgInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const cRef = useRef()
    const wRef = useRef()
    const sRef = useRef()

    useEffect(() => {
        if (!cRef || !wRef || !sRef || isLoading || imgInfo.length !== 2) return
        const ctx = cRef.current.getContext('2d')
        const wrapCurrent = wRef.current

        const onWrapScroll = (e) => {
            const scrolledY =
                e.currentTarget.getBoundingClientRect().top -
                sRef.current.getBoundingClientRect().top

            const scrolledRatio = scrolledY / sRef.current.offsetHeight

            drawImageInCanvas(ctx, scrolledRatio, imgMotion, imgInfo[0]?.img)
        }

        // const vHeight = wRef.current.scrollHeight
        // const vWidth = wRef.current.scrollWidth
        // cRef.current.width = vWidth
        // cRef.current.height = vHeight

        wrapCurrent.addEventListener('scroll', onWrapScroll)

        return () => {
            wrapCurrent.addEventListener('scroll', onWrapScroll)
        }
        // ctx.drawImage(imgInfo[0]?.img, 0, 0, 360, 800)
    }, [cRef, wRef, sRef, isLoading, imgInfo])

    useEffect(() => {
        const onWindowLoad = () => {
            setIsLoading(false)
        }
        imgs.forEach((src) => {
            const img = new Image()
            img.src = src
            img.addEventListener('load', (e) => {
                setImgInfo((v) => [
                    ...v,
                    {
                        img: e.target,
                        src: img.src,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                    },
                ])
            })
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
                    <>
                        <div ref={sRef} className={Styles.scene}>
                            <canvas
                                className={Styles.mycanvas}
                                ref={cRef}
                                width={360}
                                height={800}
                            ></canvas>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
