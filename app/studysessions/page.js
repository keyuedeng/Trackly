'use client'
import React from 'react'
import { useSessions } from '@/hooks/useSessions';
import SessionsList from '@/components/SessionsList';
import Main from '@/components/Main';
import Header from './components/HeaderComponent';
import Kpi from './components/Kpi';
import AddSession from './components/AddSession';

export default function Studysessions() {
    const {
        sessions, 
        loading, 
        selectedRange,
        selectedSubject,
        setSelectedRange,
        setSelectedSubject,
        fetchSessions,
        subjects
    } = useSessions('All time');

    const handleFilterChange = (subject, range) => {
        fetchSessions(subject, range);
    };

    const children = (
      <div>
          <Kpi />
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:self-start">
                <AddSession/>
            </div>
            <div className="flex-1">
                <SessionsList 
                  sessions={sessions} 
                  loading={loading}
                  selectedRange={selectedRange}
                  selectedSubject={selectedSubject}
                  setSelectedRange={setSelectedRange}
                  setSelectedSubject={setSelectedSubject}
                  subjects={subjects}
                  onFilterChange={handleFilterChange}
              />
            </div>
        </div>
          
      </div>
  )
  
  return (
    <Main>
        <Header />
        {children}
    </Main>
)
}