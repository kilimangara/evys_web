import React, { Component } from 'react'
import Popover from '@material-ui/core/Popover'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { chooseCompany } from '../../actions/admin/AccountActions'
import { logoutAction } from '../../actions/admin/AccountActions'

const HeaderPopover = ({
    open,
    classes,
    accountId,
    userAccounts,
    anchorEl,
    onClose,
    chooseCompany,
    currentCompany,
    currentAccount,
    logoutAction,
    history
}) => (
    <Popover open={open} anchorEl={anchorEl} onClose={onClose}>
        <div className={classes.contentContainer}>
            <div className={`${classes.content} ${classes.isBold} ${classes.largeFontSize}`}>{currentAccount}</div>
            <p>
                <span className={classes.title}>Номер аккаунта: </span>
                <span>{accountId}</span>
            </p>
            <div className={classes.separator} />
            <div
                className={classes.clickableContent}
                onClick={() => {
                    history.push('/admin/choose_account')
                    onClose()
                }}
            >
                Управление аккаунтами
            </div>
            <div className={classes.clickableContent}>Профиль</div>
            <div
                className={classes.clickableContent}
                onClick={() => {
                    onClose()
                    logoutAction()
                    history.push('/admin/login')
                }}
            >
                Выход
            </div>
            <div className={classes.separator} />
            <div className={classes.title}>Аккаунты</div>
            {userAccounts &&
                userAccounts.map(account => (
                    <div
                        key={account.id}
                        className={`${classes.clickableContent} ${
                            account.permalink === currentCompany ? `${classes.isBold} ${classes.isSelected}` : ''
                        }`}
                        onClick={() => {
                            chooseCompany(account.permalink)
                            history.push('/admin')
                            onClose()
                        }}
                    >
                        {account.name}
                    </div>
                ))}
        </div>
    </Popover>
)

const styles = theme => ({
    contentContainer: {
        marginLeft: '10px',
        width: '300px'
    },
    content: {
        margin: '10px 0'
    },
    largeFontSize: {
        fontSize: '20px'
    },
    clickableContent: {
        margin: '10px 0',
        color: '#4290d8',
        cursor: 'pointer'
    },
    isBold: {
        fontWeight: 'bold'
    },
    isSelected: {
        color: '#4290d8'
    },
    title: {
        color: 'gray'
    },
    separator: {
        display: 'block',
        height: '1px',
        border: '0',
        borderTop: '1px solid rgba(128,128,128, .5)',
        margin: '1em 0px',
        padding: '0'
    }
})

const mapStateToProps = ({ company_admin, account_admin: { profileData } }) => ({
    accountId: profileData && profileData.id,
    userAccounts: company_admin && company_admin.companyList,
    currentCompany: company_admin && company_admin.currentCompany,
    currentAccount: profileData && profileData.username
})

const mapActionsToProps = {
    chooseCompany,
    logoutAction
}

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapActionsToProps
    )(HeaderPopover)
)
