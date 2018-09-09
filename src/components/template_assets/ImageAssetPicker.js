import React, {Component} from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {grey900} from 'material-ui/styles/colors'
import bind from 'memoize-bind'
import TextField from 'material-ui/TextField'
import Dropzone from 'react-dropzone'
import {connect} from 'react-redux'
import {loadAssets, createAsset} from '../../actions/admin/TemplateAssetsActions'
import IconButton from 'material-ui/IconButton'

class ImageAssetPicker extends Component {

  constructor(props){
    super(props)
    this.state = {
      query: '',
      currentPage: 1,
      assets: [],
      totalPages:1,
      dropzoneActive: false
    }
    this.meta = {}
  }

  setMeta = (meta) => {
    this.meta = meta
  }

  componentWillMount(){
    this.props.loadAssets(this.state.currenPage, {type: this.props.mediaType})
              .then(this.loadingCallback)
  }

  searchBoxChange = (event, value) => {
    this.setState({query: value})
  }

  searchQuery = () => {
    const {query} = this.state
    this.props.loadAssets(1, {name:query, type:this.props.mediaType})
              .then(this.loadingCallback)
  }

  loadingCallback = (res) => {
    this.setState({assets: res.data.data.results, totalPages:res.data.data.count })
  }

  renderAsset = (asset, index) => {
    return(
      <Card style={styles.cardStyle} key={index}>
        <CardTitle title={asset.name} />
        <CardMedia>
          <img src={asset.file} alt="" />
        </CardMedia>
        <CardActions>
          <FlatButton label={'Выбрать'} onClick={bind(this.props.assetPicked, this, asset, this.meta)}/>
        </CardActions>
      </Card>
    )
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    console.log(files)
    files.forEach((file, index) => {
      this.props.createAsset({
        file,
        type: this.props.mediaType,
        name: file.name
      }).then(()=>{
        if (index === files.length - 1) {
          this.props.loadAssets(this.state.currenPage, {type: this.props.mediaType})
                    .then(this.loadingCallback)
        }
      })
    })
    this.setState({
      dropzoneActive: false
    });
  }


  render(){
    const {assets, dropzoneActive} = this.state
    const overlayStyle = {...styles.dropzoneStyle}
    if(dropzoneActive){
      overlayStyle.backgroundColor = 'rgba(128,128,128, .5)'
    }
    return(
        <div style={styles.container}>
          <div style={styles.searchBox}>
            <TextField onChange={this.searchBoxChange}
              hintText="Поиск" value={this.state.query}
              underlineFocusStyle={{borderColor: grey900}} />
            <IconButton iconClassName={'fas fa-search'}
                        onClick={this.searchQuery}
                        style={{color: grey900}}
                        tooltip={'Поиск'} tooltipPosition={'top-center'}/>
          </div>
          <Dropzone accept='image/*'
                    style={{position: "relative"}}
                    onDrop={bind(this.onDrop, this)}
                    onDragEnter={bind(this.onDragEnter, this)}
                    onDragLeave={bind(this.onDragLeave, this)}>
              <div style={overlayStyle}>
                Перетащите сюда файлы или нажмите
              </div>
          </Dropzone>
          {assets.map(this.renderAsset)}
        </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    padding: 12
  },
  cardStyle: {
    margin: 8
  },
  searchBox: {
    display: 'inline-block'
  },
  dropzoneStyle: {
    marginVertical: 12,
    height: 150,
    borderRadius: 15,
    padding: 16,
    borderWidth: 2,
    borderColor: grey900,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems:'center',
    display:'flex'
  }
}

ImageAssetPicker.defaultProps = {
  assetPicked: (assetObject, meta) => {},
  mediaType: 'image'
}

export default connect(null, {loadAssets, createAsset})(ImageAssetPicker)
