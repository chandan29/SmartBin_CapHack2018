import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import FileInput from 'simple-react-file-uploader';
import * as API from './api/API';
import rec from './recycle.png';
import cmp from './compost.jpg';
import lf from './landfill.png';
var self=this;
class Routing extends Component{


  constructor(props){
    super(props);
    console.log(this);

    this.state={
      type:null
    }
  }




  handleChange = (req) => {
    console.log("asjbdasjhkdbhjasd");
    console.log(this);
    console.log(req[0].name);
    var payload={filepath:req[0].name};

    API.sendFile(payload)
    .then(res=>{
      console.log(res);
      if(res==1){
        this.props.history.push('/recycle');
      }
      else if(res==2){
       this.props.history.push('/compost');
      }
      else{

        this.props.history.push('/landfill');
      }

    })
  }

  fileHandle(req){
    console.log(req);
    var payload={fileName:req[0].name};
    API.imgFile(payload)
    .then(res=>{
      console.log(res);
    })
  }

  render(){
    return(
      <div>
        <Route exact path="/" render={() => (
                  <div>
                    <FileInput
               multiple={true}
               onChange = {this.handleChange}
               accept="image/*"
              />
                  </div>

              )}/>
            <Route exact path="/recycle" render={() => (
                        <div>
                          <img src={rec} />
                      </div>

                    )}/>
                  <Route exact path="/compost" render={() => (
                                <div>
                                  <img src={cmp} />
                              </div>

                            )}/>
                          <Route exact path="/landfill" render={() => (
                                        <div>
                                          <img src={lf} />
                                      </div>

                                    )}/>


                                  <Route exact path="/market" render={() => (
                                  <div>
  <link rel="stylesheet" href="./index3.css" />
  <div className = "header">
    <p>Contact Us</p>
    <p>Get Smart Bins</p>
    <p>Home</p>
    <p id = "logo">Smart Bin</p>
  </div>

  <div className = "search-bar">
  <input type="text"/>
  </div>
  <div className = "map-search"><iframe src="https://www.google.com/maps/d/u/1/embed?mid=1QTwA3s7TbCvkkyl-Elbvebmyv0YNGaDk" width="640" height="480"></iframe> </div>

  <div className= "loc-list">
  <h2>Bins nearest you:</h2>

  <div>
    <ol>
      <li><a href="#">Bin #4355</a><br/>427 Brannan St<br/>San Francisco, CA 94107</li>
    <li><a href="#">Bin #4354</a><br/>55 Music Concourse Drive<br/>San Francisco, CA 94118</li>
  <li><a href="#">Bin #4356</a><br/>610 Old Mason St<br/>San Francisco, CA 94129</li>
    </ol>
  </div>
  </div>

  <script src="./index2.js"></script>
    <div>
       <h2>Current bids</h2>
        <p>Plastic: $0.11 per pound<br/>Compost: $13 per yard<sup>3</sup></p>
      </div>
    <div>
      <div>
        <p></p>
      </div>
      <div class= "bid-info">
        <h2>Place a bid</h2>
       <div class="dropdown">
        <button onclick="myFunction()" class="dropbtn">Choose material</button>
        <div id="myDropdown" class="dropdown-content">
        <a href="#">Plastic</a>
        <a href="#">Compost</a>
        <a href="#">Electronics</a>
        <a href="#">Batteries</a>
    </div>
         <div class="bid"> <input type="text"/> </div>
                                  </div>
                          </div>
                        </div>
                      </div>

                          )}/>



      </div>

    );
  }
}



export default withRouter(Routing);


/*
<Route exact path="/" render={() => (
          <div>
            <FileInput
       multiple={true}
       onChange = {this.handleChange}
       accept="image/*"
      />
          </div>

      )}/>
    <Route exact path="/recycle" render={() => (
                <div>
                  Div 1
              </div>

            )}/>
          <Route exact path="/compost" render={() => (
                        <div>
                          Div 2
                      </div>

                    )}/>
                  <Route exact path="/landfill" render={() => (
                                <div>
                                  Div 3
                              </div>

                            )}/>
                            */
/*

                            {!this.state.type?
                              (<div>
                                <FileInput
                                multiple={true}
                                onChange = {this.handleChange}
                                accept="image/*"
                                />
                            </div>):
                            (<div>
                              {this.state.type==1?(<div>
                                recycle
                              </div>):(<div>
                                {this.state.type==2?(<div>
                                  compost
                                </div>):(<div>
                                  landfill
                                </div>)}
                              </div>)}
                            </div>)}
*/
