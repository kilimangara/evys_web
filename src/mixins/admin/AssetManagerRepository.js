
import {
  assetPicked,
  switchManager
} from '../../reducers/admin/assetManager'

export default superclass =>
    class AssetManagerRepository extends superclass {
        //Здесь методы для работы с данными из компонента
    }

export class AssetManagerProvider {
    static mapStateToProps = state => ({
      asset: state.assetManager.asset,
      meta: state.assetManager.meta,
      assetManagerOpened: state.assetManager.managerOpened
    })

    static mapDispatchToProps = {
        assetPicked,
        switchManager
    }
}
