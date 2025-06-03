"use client"

import { useState, useEffect } from "react"

export const useTypingAnimation = (fullText: string) => {
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let index = 0
    let timer: NodeJS.Timeout

    const typeText = () => {
      if (!isDeleting && index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
        timer = setTimeout(typeText, 50)
      } else if (!isDeleting && index === fullText.length) {
        timer = setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && index > 0) {
        setTypedText(fullText.slice(0, index - 1))
        index--
        timer = setTimeout(typeText, 30)
      } else if (isDeleting && index === 0) {
        setIsDeleting(false)
        timer = setTimeout(typeText, 500)
      }
    }

    typeText()

    return () => clearTimeout(timer)
  }, [isDeleting, fullText])

  return typedText
}
