import _ from 'lodash';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'

const YT_API_KEY = 'AIzaSyAfjytFS9AjrOTSmtTNq4QqGEB-cMX1lrg';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
       videos: [],
       selectedVideo: null
     };

    this.videoSearch("surfboards");
}
  videoSearch(term){
    YTSearch({key: YT_API_KEY, term: term}, (videos) => {
      this.setState({
        videos:videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return  (
    <div>
      <SearchBar onSearchTermChange={videoSearch} />
      <VideoDetail video={this.state.selectedVideo}/>
      <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
        videos={this.state.videos} />
    </div>
    );
  }
}
//Render the component to the d
ReactDom.render(<App />, document.querySelector('.container'));
