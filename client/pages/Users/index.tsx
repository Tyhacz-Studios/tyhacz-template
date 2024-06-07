import React, { useEffect, useState } from 'react'
import { Page, Section, SectionActions } from '../../components/Page'
import { UserType } from '../../../server/models/User'
import { getUsers } from '../../requests/users'
import { handleError } from '../../errors/handleError'
import { AddUser } from './AddUser'

export const Users: React.FC = () => {
    const [users, setUsers] = useState<UserType[]>([])
    const [addingNewUser, setAddingNewUser] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsers()
                setUsers(res.data)
            } catch (err) {
                handleError(err, 'Something went wrong loading your customers. Please come back later.')
            }
        }

        fetchUsers()
    }, [])

    return (
        <>
            <h1>Users</h1>
            <AddUser
                show={addingNewUser}
                onClose={() => setAddingNewUser(false)}
                onUserAdded={(newUser) => setUsers([...users, newUser])}
            />
            <Page>
                <Section title="Manage Users">
                    <SectionActions>
                        <button className="primary" onClick={() => setAddingNewUser(true)}>
                            Add User
                        </button>
                    </SectionActions>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th></th>
                                <th>Last Login</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.lastLogin
                                            ? 'Active'
                                            : 'Disabled'
                                        }</td>
                                        <td>{user.lastLogin
                                            ? new Date(user.lastLogin).toLocaleString()
                                            : 'Never'
                                        }</td>
                                    </tr>
                                ))
                            }
                       </tbody>
                    </table>
                </Section>
            </Page>
        </>
    )
}
