import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { createServer } from '../store'
import CreateServer from '../components/CreateServer'
import { IServer } from '../types'

const mapDispatchToProps = (dispatch: Dispatch) => ({
    createServer: (server: Pick<IServer, 'name' | 'url' | 'port'>) => {
        return dispatch(createServer(server))
    }
})

export default connect(
    undefined,
    mapDispatchToProps
)(CreateServer)
