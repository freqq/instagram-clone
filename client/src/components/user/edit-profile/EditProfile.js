import React, {Component} from 'react'
import Header from '../../header/Header'
import ProfileFooter from '../profile/profile-footer/ProfileFooter'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import './EditProfile.css'
import ProfileDetails from './profile-details/ProfileDetails';
import ChangePassword from './change-password/ChangePassword';
import PrivacySettings from './privacy-settings/PrivacySettings';
import AuthorizedApps from './authorized-apps/AuthorizedApps';
import MessagesEmailSms from './messages-email-sms/MessagesEmailSms';
import ManageContacts from './manage-contacts/ManageContacts';

class EditProfile extends Component {
    render() {
        return (
            <div className="edit-profile-component">
                <Header/>
                <div className="container">
                    <div className="row profile-edit">
                        <Tabs>
                            <div className="col-3">
                                <TabList className="edit-profile-menu">
                                    <Tab >Edytuj profil</Tab>
                                    <Tab>Zmien haslo</Tab>
                                    <Tab>Autoryzowane aplikacje</Tab>
                                    <Tab>Wiadomosci e-mail i SMS</Tab>
                                    <Tab>Zarzadzaj kontaktami</Tab>
                                    <Tab>Prywatnosc i bezpieczenstwo</Tab>
                                </TabList>
                            </div>
                            <div className="col-9">
                                <TabPanel>
                                    <ProfileDetails/>
                                </TabPanel>
                                <TabPanel>
                                    <ChangePassword />
                                </TabPanel>
                                <TabPanel>
                                    <AuthorizedApps />
                                </TabPanel>
                                <TabPanel>
                                    <MessagesEmailSms />
                                </TabPanel>
                                <TabPanel>
                                    <ManageContacts />
                                </TabPanel>
                                <TabPanel>
                                    <PrivacySettings />
                                </TabPanel>
                            </div>
                        </Tabs>
                    </div>
                    <ProfileFooter/>
                </div>
            </div>
        )
    }
}

export default EditProfile