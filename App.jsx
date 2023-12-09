import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Navigation from './src/navigation/Navigation';
import AuthProvider from './src/contexts/AuthContext';
import SocketProvider from './src/contexts/SocketContext';

const App = () => {

    return (
        <Provider store={store}>
            <AuthProvider>
                <SocketProvider>
                    <Navigation/>
                </SocketProvider>
            </AuthProvider>
        </Provider>
    );
}

export default App;
