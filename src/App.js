import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";

import UserList from "./features/users/UserList";
import NotihumiList from "./features/notification/noti_humi/NotihumiList";
import LogUser from "./features/users/LogUser";
import Monitor from "./features/auth/MainMonitor";
import Stistic from "./features/auth/Stistics";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import MonitorList from "./features/monitors/MonitorList";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import useAuth from "./hooks/useAuth";
import Mainnoti from "./components/mainnoti";
import NotitempList from "./features/notification/noti_temp/NotitempList";
import NotilightList from "./features/notification/noti_light/NotilightList";
import NoticameraList from "./features/notification/noti_camara/NoticameratList";
import ActivityList from "./features/activity/ActivityList";
import SensorList from "./features/sensor/SensorList";
import EditSensor from "./features/sensor/EditSensor";


import MainStatistic from "./components/MainStatistic";
import TempStatistic from "./features/statistic/TempStatistic";
import HumiStatistic from "./features/statistic/HumiStatistic";
import CamaraStatistic from "./features/statistic/CamaraStatistic";
import LightStatistic from "./features/statistic/LightStatistic";


// import NotilightList1 from "./features/notification/noti_Light1/NotitempList";
function App() {
  const { isOfficer } = useAuth()
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route  element={<Public />} /> */}
        <Route  index element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>

            <Route path="dash" element={<DashLayout />}>
              {(isOfficer) && <Route index element={<Monitor />} />}
              <Route path="LogMonitors">
                <Route index element={<MonitorList />} />
              </Route>

              {/* <Route path="LogUser">
                <Route index element={<ActivityList />} />
              </Route> */}

              <Route path="Mainnoti" element={<Mainnoti/>}> 
                <Route path="NotitempList" element={<NotitempList />} />
                <Route path="NotihumiList" element={<NotihumiList />} />
                
                <Route path="NotilightList" element={<NotilightList />} />
                <Route path="NoticameraList" element={<NoticameraList />} />

              </Route>

              <Route path="MainStistic" element={<MainStatistic/>}> 
                <Route path="TempStatistic" element={<TempStatistic />} />
                <Route path="HumiStatistic" element={<HumiStatistic />} />
                
                <Route path="CamaraStatistic" element={<CamaraStatistic />} />
                <Route path="LightStatistic" element={<LightStatistic />} />

              </Route>
              
              <Route path="Sensor">
                <Route index element={<SensorList />} />
                <Route path=":id" element={<EditSensor />} />
               </Route>

              
              <Route path="Statistics" element={<Stistic />} />
              {/* <Route index element={<Welcome />} /> */}

              {/* <Route path="notes">
                <Route index element={<NotesList />} />
              </Route> */}

              <Route  path="users">
                <Route index element={<UserList />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="new" element={<NewUserForm />} />
              </Route>
            </Route>
            {/* end dash */}
            {/* </Route> */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
