import React, { useCallback, useRef, useState } from 'react'

interface ResizableBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  minHeight?: number
  maxHeight?: number
  children: React.ReactNode
}

const ResizableBox = ({
  minHeight = 300,
  maxHeight = 600,
  children,
  style,
  ...rest
}: ResizableBoxProps) => {
  const [height, setHeight] = useState(minHeight)
  const [isResizing, setIsResizing] = useState(false)

  const boxRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!boxRef.current) return
    const boxRect = boxRef.current.getBoundingClientRect()

    boxRef.current.style.cursor =
      event.clientY > boxRect.bottom - 10 ? 'ns-resize' : 'default'
  }, [])

  const startResizing = (event: React.MouseEvent) => {
    const boxRect = event.currentTarget.getBoundingClientRect()

    // Check if the click is near the bottom edge (within 10px)
    if (event.clientY > boxRect.bottom - 10) {
      setIsResizing(true)
      document.addEventListener('mousemove', onResize)
      document.addEventListener('mouseup', stopResizing)
    }
  }
  const onResize = (event: MouseEvent) => {
    setHeight((prev) =>
      Math.min(Math.max(prev + event.movementY, minHeight), maxHeight)
    )
  }

  const stopResizing = () => {
    setIsResizing(false)
    document.removeEventListener('mousemove', onResize)
    document.removeEventListener('mouseup', stopResizing)
  }

  return (
    <div
      ref={boxRef}
      style={{
        height,
        minHeight,
        maxHeight,
        resize: 'vertical',
        overflowY: 'auto',
        position: 'relative',
        userSelect: isResizing ? 'none' : 'auto', // Prevents text selection while resizing
        ...style
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={startResizing} // Detects mouse down anywhere on the bottom
      {...rest}
    >
      {children}
    </div>
  )
}

export default ResizableBox
