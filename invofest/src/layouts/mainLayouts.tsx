import { Outlet } from 'react-router-dom';
import Footer from '../components/footer.tsx';
import Header from '../components/header.tsx';

export default function MainLayout(){
    return(
        <div className='w-full min-h-screen flex flex-col justify-between'>
            <Header/>

            <main className="flex-1 container mx-auto py-6">
                <Outlet/>
            </main>
            <Footer/>
        </div>

    );
}