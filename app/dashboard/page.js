import Main from '@/components/Main';
import Login from '@/components/Login';
import DashboardHeader from './components/DashboardHeader';
import Dropdown from '@/components/Dropdown';
import DropdownItem from '@/components/DropdownItem';

export const metadata = {
  title: "Study Tracker · Dashboard",
};

export default function DashboardPage() {
    const range = ['This week', 'This month', 'All time'];
    const subjects = ['Calculus','Biology','Chemistry', 'hello i am a subject'];

    const isAuthenticated = true; // Replace with actual authentication logic later
    
    let children = (
        <Login />
    )

    if (isAuthenticated) {
        children = (
            <>
                <DashboardHeader/>
                <div className="flex gap-4 pt-4">
                <Dropdown buttonText="All time" content={
                    <>
                        {range.map((item) => (
                            <DropdownItem key={item}>{item}</DropdownItem>
                        ))}
                    </>
                }/>
                <Dropdown buttonText="Subjects" content={
                    <>
                        {subjects.map((item) => (
                            <DropdownItem key={item}>{item}</DropdownItem>
                        ))}
                        </>
                    }/>
                </div>
            </>
        )
    }
    return (
        <Main>
            {children}
        </Main>
    )
}
