// Write your code here
import {Component} from 'react'
import './index.css'

const initailState = {
  isTimeRunning: false,
  timerElaspedinSec: 0,
  timerLimitInMintues: 25,
}

class DigitalTimer extends Component {
  state = initailState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMintues} = this.state

    if (timerLimitInMintues > 1) {
      this.setState(prevState => ({
        timerLimitInMintues: prevState.timerLimitInMintues - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMintues: prevState.timerLimitInMintues + 1,
    }))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initailState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerElaspedinSec, timerLimitInMintues} = this.state
    const timeCompleted = timerElaspedinSec === timerLimitInMintues * 60

    if (timeCompleted) {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timerElaspedinSec: prevState.timerElaspedinSec + 1,
      }))
    }
  }

  onStartorPause = () => {
    const {isTimeRunning, timerElaspedinSec, timerLimitInMintues} = this.state
    const isTimeComplete = timerElaspedinSec === timerLimitInMintues * 60

    if (isTimeComplete) {
      this.setState({timerElaspedinSec: 0})
    }
    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerElaspedinSec, timerLimitInMintues} = this.state
    const totalRemainingSeconds = timerLimitInMintues * 60 - timerElaspedinSec
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringfiedMin = minutes > 9 ? minutes : `0${minutes}`
    const stringfiedSec = seconds > 9 ? seconds : `0${seconds}`
    return `${stringfiedMin}:${stringfiedSec}`
  }

  render() {
    const {timerElaspedinSec, timerLimitInMintues, isTimeRunning} = this.state
    const isButtonDisabled = timerElaspedinSec > 0

    const startOrPauseImg = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altStartorPause = isTimeRunning ? 'pause icon' : 'play icon'

    const lableText = isTimeRunning ? 'Running' : 'Paused'

    const buttonText = isTimeRunning ? 'Pause' : 'Start'

    return (
      <div className="cont">
        <h1 className="head">Digital Timer</h1>
        <div className="digital-timer-cont">
          <div className="timer-cont">
            <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
            <p className="time-info">{lableText}</p>
          </div>
          <div className="controls-cont">
            <div className="btns-cont">
              <button
                type="button"
                className="control-btn"
                onClick={this.onStartorPause}
              >
                <img
                  src={startOrPauseImg}
                  className="btn-img"
                  alt={altStartorPause}
                />
                {buttonText}
              </button>

              <button
                type="button"
                className="control-btn"
                onClick={this.onResetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="btn-img"
                />
                Reset
              </button>
            </div>
            <div className="sub-btns-cont">
              <p>Set Timer Limit</p>
              <div className="time-limit-cont">
                <button
                  type="button"
                  className="limit-btn"
                  onClick={this.onDecreaseTimerLimitInMinutes}
                  disabled={isButtonDisabled}
                >
                  -
                </button>
                <div className="limit-cont">
                  <p className="limit-count">{timerLimitInMintues}</p>
                </div>
                <button
                  type="button"
                  className="limit-btn"
                  onClick={this.onIncreaseTimerLimitInMinutes}
                  disabled={isButtonDisabled}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
