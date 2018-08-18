import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { setSetting } from '../store'
import { IApplicationState } from '../../../store'
import Settings from '../components/Settings'
import { ISettings } from '../types'

const mapStateToProps = ({ settings: { settings } }: IApplicationState): {
    settings: ISettings
} => ({
    settings
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSetting: (key: string, value: any) => {
        return dispatch(setSetting(key, value))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)
