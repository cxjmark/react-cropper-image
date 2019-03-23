/**
 * @member 图片裁剪
 */
import React, { Component } from 'react'
import CropperJs from 'cropperjs'
import PropTypes from 'prop-types'
import 'cropperjs/dist/cropper.css'
import './index.css'
class Cropper extends Component {
  constructor(props) {
    super(props)
    this.cropperRef = React.createRef()
  }
  componentDidMount() {
    this.cropper = new CropperJs(this.cropperRef.current, this.props)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.cropper.replace(nextProps.src)
    }
  }
  componentWillUnmount() {
    if (this.cropper) {
      this.cropper.destroy()
    }
  }

  render() {
    const { roundedCanvas } = this.props
    return (
      <div className={roundedCanvas ? 'rounded-canvas' : ''}>
        <img
          style={this.props.imgStyle}
          ref={this.cropperRef}
          src={this.props.src}
          alt={this.props.alt === undefined ? 'picture' : this.props.alt}
        />
      </div>
    )
  }


  /**
   *
   * @param {Blob} sourceCanvas
   * @description 图片转圆角
   */
  createRoundedCanvasElement(sourceCanvas) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const width = sourceCanvas.width
    const height = sourceCanvas.height
    canvas.width = width
    canvas.height = height
    context.imageSmoothingEnabled = true
    context.drawImage(sourceCanvas, 0, 0, width, height)
    context.globalCompositeOperation = 'destination-in'
    context.beginPath()
    context.arc(
      width / 2,
      height / 2,
      Math.min(width, height) / 2,
      0,
      2 * Math.PI,
      true
    )
    context.fill()
    return canvas
  }
  /**
   * 获取裁剪的图片
   * @returns {String} base64
   */
  getCroppedCanvas () {
    const { roundedCanvas } = this.props
    const croppedImg = this.cropper.getCroppedCanvas()
    if (roundedCanvas) {
      return this.createRoundedCanvasElement(croppedImg).toDataURL()
    } else {
      return croppedImg.toDataURL()
    }
  }
  
}

Cropper.propTypes = {
  viewMode: PropTypes.number,
  imgStyle: PropTypes.object,
  src: PropTypes.string.isRequired,
  dragMode: PropTypes.oneOf(['crop', 'move', 'none']),
  aspectRatio: PropTypes.number,
  data: PropTypes.object,
  preview: PropTypes.string,
  responsive: PropTypes.bool,
  restore: PropTypes.bool,
  checkCrossOrigin: PropTypes.bool,
  checkOrientation: PropTypes.bool,
  modal: PropTypes.bool,
  guides: PropTypes.bool,
  center: PropTypes.bool,
  highlight: PropTypes.bool,
  background: PropTypes.bool,
  autoCrop: PropTypes.bool,
  autoCropArea: PropTypes.number,
  movable: PropTypes.bool,
  rotatable: PropTypes.bool,
  scalable: PropTypes.bool,
  zoomable: PropTypes.bool,
  zoomOnTouch: PropTypes.bool,
  zoomOnWheel: PropTypes.bool,
  wheelZoomRatio: PropTypes.number,
  cropBoxMovable: PropTypes.bool,
  cropBoxResizable: PropTypes.bool,
  roundedCanvas: PropTypes.bool,
  toggleDragModeOnDblclick: PropTypes.bool,
  // Size limitation
  minCanvasWidth: PropTypes.number,
  minCanvasHeight: PropTypes.number,
  minCropBoxWidth: PropTypes.number,
  minCropBoxHeight: PropTypes.number,
  minContainerWidth: PropTypes.number,
  minContainerHeight: PropTypes.number
}
Cropper.defaultProps = {
  viewMode: 0,
  imgStyle: {
    maxWidth: '100%',
    width: '100%'
  },
  src: '',
  dragMode: 'crop',
  initialAspectRatio: NaN,
  aspectRatio: NaN,
  data: null,
  preview: '',
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  modal: true,
  guides: true,
  center: true,
  highlight: true,
  background: true,
  autoCrop: true,
  autoCropArea: 0.8,
  movable: true,
  rotatable: true,
  scalable: true,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  wheelZoomRatio: 0.1,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
  minCanvasWidth: 0,
  minCanvasHeight: 0,
  minCropBoxWidth: 0,
  minCropBoxHeight: 0,
  minContainerWidth: 200,
  minContainerHeight: 100
}
export default Cropper
