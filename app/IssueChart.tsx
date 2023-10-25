"use client";
import React from 'react'
import { Card } from '@radix-ui/themes'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'
interface Props {
    open: number;
    closed: number;
    inprogress: number;
}
const IssueChart = ({ open, closed, inprogress }: Props) => {
    const barchartData = [
        { label: 'In Progress', value: inprogress },
        { label: 'Closed', value: closed },
        { label: 'Open', value: open },
    ]
    return (
        <Card>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barchartData}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Bar dataKey="value" barSize={60} style={{ fill: 'var(--accent-9)' }} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default IssueChart