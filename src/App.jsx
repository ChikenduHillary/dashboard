import {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Sidebar, Navbar, ThemeSettings } from './component/index';
import { Ecommerce, Orders, Employees, Customers, Calendar, Kanban, Editor, ColorPicker, Line, Area, Bar, Pie, Financial, ColorMapping, Pyramid, Stacked } from './pages/index';

import "./App.css";

import { useStateContext } from './contexts/ContextProvider';
const App = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode, getCurrentThemeAndColor, setCurrentColor, setCurentMode } = useStateContext();
  const { theme, color } = getCurrentThemeAndColor();

  useEffect(() =>{
    theme ? setCurentMode(theme) : setCurentMode('Light');
    color ? setCurrentColor(color) : setCurrentColor('#03C9D7');
    
  }, [theme])

  return (
    <div className={ currentMode === 'Dark' ? 'dark' : '' }>
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg overflow-hidden'>
            <div className='fixed right-4 bottom-4' style={{zIndex: '1000'}}>
                <TooltipComponent content='Settings' position='Top'>
                    <button type='button' onClick={() => setThemeSettings(true)} className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white' style={{ background: currentColor, borderRadius: '50%'}}>
                        <FiSettings />
                    </button>
                </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                 <Sidebar />
              </div>
            ) : (
              <div className='w-0 dark:bg-secondary-dark-bg'>
               
              </div>
            )}
            <div className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`}>
              <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                <Navbar />
              </div>
              <div className='overflow-hidden'>
                { themeSettings && <ThemeSettings /> }
                <Routes>
                  {/* Dashboard */}
                  <Route path='/' element={<Ecommerce />} />
                  <Route path='/ecommerce' element={<Ecommerce />} />

                  {/* Pages */}
                  <Route path='/orders' element={<Orders />} />
                  <Route path='/employees' element={<Employees />} />
                  <Route path='/customers' element={<Customers />} />

                  {/* Apps */}
                  <Route path='/kanban' element={<Kanban />} />
                  <Route path='/editor' element={<Editor />} />
                  <Route path='/calendar' element={<Calendar />} />
                  <Route path='/color-picker' element={<ColorPicker />} />

                  {/* Charts */}
                  <Route path='/line' element={<Line />} />
                  <Route path='/area' element={<Area />} />
                  <Route path='/bar' element={<Bar />} />
                  <Route path='/pie' element={<Pie />} />
                  <Route path='/financial' element={<Financial />} />
                  <Route path='/color-mapping' element={<ColorMapping />} />
                  <Route path='/pyramid' element={<Pyramid />} />
                  <Route path='/stacked' element={<Stacked />} />
                </Routes>
              </div>
            </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;