
import {
  assetPicked,
  switchManager
} from '../../reducers/admin/assetManager'

export default superclass =>
    class AssetManagerRepository extends superclass {
        //Здесь методы для работы с данными из компонента

        passImageFromManager = () => {
          const { asset } = this.props
          if (asset && this.quill != null) {
              const editor = this.quill.getEditor()
              const range = editor.getSelection()
              const index = Boolean(range) ? range.index : 0
              editor.insertEmbed(index, 'image', asset.file, 'user')
              this.props.assetPicked({})
              this.props.switchManager()
          }
        }
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
