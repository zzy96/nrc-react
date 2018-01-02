import React from 'react'
import HomeReviewListItem from './HomeReviewListItem'
import { Pagination, Spin } from 'antd'
import { readReview } from '../service/blockchain'
import { addressToUsername } from '../service/backend'
import { timeConverter } from '../service/util'

const hrStyle = {
  backgroundColor: 'white',
  width: '95%',
  height: '1px',
  border: 'none'
}
const paginationStyle = {
  textAlign: 'center'
}
const loadingStyle = {
  margin: '50px',
  textAlign: 'center'
}
const noReviewStyle = {
  textAlign: 'center',
  color: 'white'
}

class HomeReviewList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isProcessing: true,
      reviews: []
    }
  }

  handleChange = (page) => {
    var index = (page - 1) * 5
    var counter = this.props.reviewAmount - index
    if (counter == 0){
      this.setState({
        isProcessing: false
      })
    }
    /* first */
    if (this.props.reviewAmount > index){
      readReview(this.props.storeId, index, (review) => {
        review.time = timeConverter(parseInt(review.timestamp) * 1000)
        review.score = parseInt(review.score)/20
        addressToUsername(review.reviewerAddress, (reviewer) => {
          review.reviewer = reviewer
          var reviews = this.state.reviews
          reviews.push(review)
          this.setState({
            reviews
          })
          counter--
          if (counter == 0){
            this.setState({
              isProcessing: false
            })
          }
        })
      })
    }
    /* second */
    if (this.props.reviewAmount > index + 1){
      readReview(this.props.storeId, index + 1, (review) => {
        review.time = timeConverter(parseInt(review.timestamp) * 1000)
        review.score = parseInt(review.score)/20
        addressToUsername(review.reviewerAddress, (reviewer) => {
          review.reviewer = reviewer
          var reviews = this.state.reviews
          reviews.push(review)
          this.setState({
            reviews
          })
          counter--
          if (counter == 0){
            this.setState({
              isProcessing: false
            })
          }
        })
      })
    }
    /* third */
    if (this.props.reviewAmount > index + 2){
      readReview(this.props.storeId, index + 2, (review) => {
        review.time = timeConverter(parseInt(review.timestamp) * 1000)
        review.score = parseInt(review.score)/20
        addressToUsername(review.reviewerAddress, (reviewer) => {
          review.reviewer = reviewer
          var reviews = this.state.reviews
          reviews.push(review)
          this.setState({
            reviews
          })
          counter--
          if (counter == 0){
            this.setState({
              isProcessing: false
            })
          }
        })
      })
    }
  }

  componentDidMount() {
    this.handleChange(1)
  }

  render(){
    return(
      <div>
        { !this.state.isProcessing && this.props.reviewAmount>0 &&
          <div>
            {this.state.reviews.map((review, index) =>
              <div key={index}>
                <HomeReviewListItem
                  review={review}
                />
              </div>
            )}
            <hr style={hrStyle} />
            <div style={paginationStyle}>
              <Pagination
                pageSize={3}
                total={this.props.reviewAmount}
                size='small'
                onChange={this.handleChange}
              />
            </div>
          </div>
        }
        { !this.state.isProcessing && this.props.reviewAmount==0 &&
          <div>
            <hr style={hrStyle} />
            <p style={noReviewStyle}>== No Review ==</p>
          </div>
        }
        { this.state.isProcessing &&
          <div style={loadingStyle}>
            <Spin size="large" />
          </div>
        }
      </div>
    )
  }
}

export default HomeReviewList
