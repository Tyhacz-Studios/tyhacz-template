import React, { useMemo } from 'react'
import { Page, Section, SectionActions } from '../../components/Page'

export const Dashboard: React.FC = () => {
    const todaysDate = useMemo(() => {
        const today = new Date()
        return today.toDateString()
    }, [])

    return (
        <Page>
            <Section title="Dashboard">
                <SectionActions>
                    <button className="primary">
                        Primary Action
                    </button>
                </SectionActions>

                Today is {todaysDate}
            </Section>
        </Page>
    )
}
