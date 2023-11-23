import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Navigation from './src/navigation/Navigation';
import AuthProvider from './src/contexts/AuthContext';

const App = () => {

    return (
        <Provider store={store}>
            <AuthProvider>
                <Navigation/>
            </AuthProvider>
        </Provider>
    );
}

export default App;
