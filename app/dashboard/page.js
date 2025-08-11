import Main from '@/components/Main';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/Login';

export const metadata = {
  title: "Study Tracker · Dashboard",
};

export default function DashboardPage() {

    const isAuthenticated = false; // Replace with actual authentication logic later
    
    let children = (
        <Login />
    )

    if (isAuthenticated) {
        children = (
            <Dashboard />
        )
    }
    return (
        <Main>
            {children}
        </Main>
    )
}
