import React, {Component} from 'react'
import { connect } from 'react-redux'
import RaisedButton from "material-ui/RaisedButton"
import {withGetScreen} from 'react-getscreen'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import {loadStudents, addStudent} from '../../actions/admin/StudentActions'
import {subscribeStudents} from '../../actions/admin/TariffActions'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import {grey500, grey200, grey900, blue500} from 'material-ui/styles/colors'
import ReactPaginate from 'react-paginate'
import '../../screencss/PaginateCss.scss'
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert"
import MenuItem from "material-ui/MenuItem"
import IconMenu from "material-ui/IconMenu"
import TextField from 'material-ui/TextField'
import Modal from 'reboron/ScaleModal'
import StudentCreation from '../../components/students/StudentCreation'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import update from 'immutability-helper'
import Snackbar from 'material-ui/Snackbar'


class StudentsScreen extends Component {

  constructor(props){
    super(props)
    const paramsStr = this.props.location.search
    const params = new URLSearchParams(paramsStr)
    this.state = {
      searchQuery: '',
      currentPage: 1,
      tariffId: params.get('tariff_id'),
      selectedRows: [],
      openSnackbar: false,
      messageSnackbar: ''
    }
  }

  componentWillMount(){
    this.props.loadStudents(this.state.currentPage)
  }

  renderStudent = (student, index) => {
    return (
      <TableRow key={student.id} selected={this.isSelected(index)}>
        <TableRowColumn>{student.id}</TableRowColumn>
        <TableRowColumn>{student.full_name}</TableRowColumn>
        <TableRowColumn>{student.phone}</TableRowColumn>
        <TableRowColumn>{student.email}</TableRowColumn>
      </TableRow>
    )
  }

  componentWillReceiveProps(nextProps){
    const paramsStr = nextProps.location.search
    const params = new URLSearchParams(paramsStr)
    this.setState({tariffId: params.get('tariff_id')})
  }

  // <TableRowColumn>
  //   <IconMenu
  //        iconButtonElement={
  //          <IconButton>
  //            <MoreVertIcon color={grey500} />
  //          </IconButton>
  //        }
  //        targetOrigin={{ horizontal: "right", vertical: "top" }}
  //        anchorOrigin={{ horizontal: "right", vertical: "top" }}
  //      >
  //        <MenuItem primaryText="Выставить счет" onClick={this.goToTariffs.bind(this, student.id)} />
  //     </IconMenu>
  // </TableRowColumn>

  onRowSelection = (newRows) => {
    const {currentPage} = this.state
    const {students} = this.props
    if(newRows == 'all'){
      this.setState({selectedRows:students.map(el => el.id)})
      return
    }
    if(newRows == 'none'){
      this.setState({selectedRows:[]})
      return
    }
    this.setState({selectedRows: newRows})
  }

  isSelected = (index) => {
    return this.state.selectedRows.indexOf(index) !== -1;
  }

  onPageChanged = (page) => {
    const {searchQuery} = this.state
    if(page.selected == 0) return
    this.setState({currentPage: page.selected})
    this.props.loadStudents(page.selected, searchQuery)
  }

  searchBoxChange = (event, newValue) => {
    this.setState({
      searchQuery: newValue
    })
  }

  searchQuery = () => {
    const {searchQuery} = this.state
    this.setState({currentPage: 1, selectedRows: []})
    this.props.loadStudents(1, searchQuery)
  }

  onStudentAdded = (studentObj) => {
    console.log(studentObj)
    const {searchQuery, currentPage} = this.state
    this.props.addStudent(studentObj).then(()=>{
      this.props.loadStudents(currentPage, searchQuery)
      this.modal.hide()
    }).catch((err)=>{
      console.log(err.response)
      this.setState({openSnackbar: true, messageSnackbar: 'Ваш тарифный план не позволяет добавлять новых учеников'})
    })
  }

  floatingButtonClicked = () => {
    this.modal.show()
  }

  isSelectable = () => {
    return this.state.tariffId != undefined
  }

  extractStudentIds = (selectedIndices) => {
    const result = []
    selectedIndices.forEach(el => result.push(this.props.students[el].id))
    console.log(result)
    return result
  }

  subscribeStudents = () => {
    const {selectedRows, tariffId} = this.state
    this.props.subscribeStudents(tariffId, this.extractStudentIds(selectedRows)).then(()=>{
      this.setState({openSnackbar: true, messageSnackbar: 'Ученики записаны на курс'})
    }).catch(()=>{
      this.setState({openSnackbar: true, messageSnackbar: 'Что-то пошло не так при записи'})
    })
  }

  handleRequestCloseSnackbar = () => {
    this.setState({openSnackbar: false, messageSnackbar: ''})
  }

  render(){
    const {students, totalPages} = this.props
    return (
      <div style={styles.container}>
        <div style={{display:'inline-block'}}>
          <div style={styles.searchBox}>
            <TextField onChange={this.searchBoxChange}
              hintText="Поиск" value={this.state.searchQuery}
              underlineFocusStyle={{borderColor: grey900}} />
            <IconButton iconClassName={'fas fa-search'}
                        onClick={this.searchQuery}
                        style={{color: blue500}}
                        tooltip={'Поиск'} tooltipPosition={'top-center'}/>
          </div>
        </div>
        <Table onRowSelection={this.onRowSelection} selectable={this.isSelectable()} multiSelectable={true}>
          <TableHeader displaySelectAll enableSelectAll={this.isSelectable()}>
            <TableRow>
              <TableHeaderColumn>Идентификатор</TableHeaderColumn>
              <TableHeaderColumn>Полное имя</TableHeaderColumn>
              <TableHeaderColumn>Телефон</TableHeaderColumn>
              <TableHeaderColumn>Почта</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover={this.isSelectable()} displayRowCheckbox deselectOnClickaway={false}>
            {students.map(this.renderStudent)}
          </TableBody>
        </Table>
        {this.isSelectable() && (
          <RaisedButton label="Записать"
            style={{marginTop:12}}
            disabled={!this.state.selectedRows.length}
            labelStyle={{color: 'white'}}
            backgroundColor={grey900}
            onClick={this.subscribeStudents}/>
        )}
        <ReactPaginate
           disableInitialCallback
           style={{marginTop:12}}
           pageCount={totalPages}
           initialPage={this.state.currentPage}
           marginPagesDisplayed={1}
           pageRangeDisplayed={4}
           onPageChange={this.onPageChanged}
           previousLabel="<<"
           nextLabel=">>"
           containerClassName={"pagination"}
        />
        <FloatingActionButton style={styles.fabStyle}
            backgroundColor={grey900}
            onClick={this.floatingButtonClicked}>
          <ContentAdd />
        </FloatingActionButton>
        <Modal ref={ref => this.modal = ref}>
          <StudentCreation onStudentSave={this.onStudentAdded}/>
        </Modal>
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.messageSnackbar}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestCloseSnackbar}
        />
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px'
  },
  searchBox: {
    display: 'inline-block',
    borderColor: grey500,
    borderWidth: '1px',
    borderRadius: '25px'
  },
  fabStyle: {
    position: 'fixed',
    right: 16,
    bottom: 16
  }
}

const mapStateToProps = state => ({
  students: state.students_admin.studentList,
  totalPages: state.students_admin.totalPages
})

export default connect(mapStateToProps, {loadStudents, addStudent, subscribeStudents})(StudentsScreen)
