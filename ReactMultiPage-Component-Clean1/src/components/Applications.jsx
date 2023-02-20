import React,{Component}  from "react";
import applicationsImage from "./images/Applications.webp";

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage1:true,
    }
    this.showPicture = this.showPicture.bind(this);
  }

  showPicture(){
    if(this.state.showImage1){
      this.setState({
        showImage1:false
      });
    }else{
      this.setState({
        showImage1:true
      });
    }
  }

  render() {
    return (
        <div className="about">
          <div class="container">
            <div class="row align-items-center my-5">
              <div class="col-lg-7">
                <img
                    class="img-fluid rounded mb-4 mb-lg-0"
                    src={applicationsImage}
                    alt=""
                />
              </div>
              <div class="col-lg-5">
                <h1 class="font-weight-light">教育应用</h1>
                <p>
                  ChatPGT可以用于各种教育应用，包括自动生成课程内容、回答学生学习问题、参与学习讨论等.
                </p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Applications;
