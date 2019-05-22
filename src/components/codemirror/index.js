import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/ruby/ruby'
import 'codemirror/mode/python/python'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter.css'
import { Controlled as CodeMirror } from 'react-codemirror2'
import styled from 'styled-components'

const LanguagePicker = styled.select`
    position: absolute;
    z-index: 25;
    right: 5px;
    top: 5px;
`

const Container = styled.div`
    position: relative;
    width: 100%;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
`

class EvysCodeMirror extends React.Component {
    static defaultProps = {
        language: '',
        canPickLanguage: true
    }

    state = {
        language: 0,
        canPickLanguage: false
    }

    componentDidMount() {
        this.setLanguage()
    }

    setLanguage = () => {
        const { canPickLanguage } = this.props
        let language = this.availableLanguages().findIndex(
            el => this.props.language.toLowerCase() === el.title.toLowerCase()
        )
        if (language === -1) language = 0
        this.setState({
            language,
            canPickLanguage
        })
    }

    pickLanguage = language => {
        console.log('LANGUAGE PICKED', language)
        if (!this.props.canPickLanguage) return
        this.setState({ language })
    }

    availableLanguages() {
        return [
            { title: 'JavaScript', mode: 'text/javascript' },
            { title: 'Java', mode: 'text/x-java' },
            { title: 'Python', mode: 'text/x-python' },
            { title: 'Ruby', mode: 'text/x-ruby' },
            { title: 'C', mode: 'text/x-csrc' },
            { title: 'C++', mode: 'text/x-c++src' }
        ]
    }

    render() {
        const { language, canPickLanguage } = this.state
        console.log(this.state)
        return (
            <Container>
                <CodeMirror
                    options={{
                        mode: this.availableLanguages()[language].mode,
                        theme: 'dracula',
                        lineNumbers: true,
                        lineWrapping: true,
                        matchBrackets: true,
                        autoCloseBrackets: true
                    }}
                    {...this.props}
                />
                <LanguagePicker
                    value={language}
                    disabled={!canPickLanguage}
                    onChange={e => this.pickLanguage(e.target.value)}
                >
                    {this.availableLanguages().map((el, index) => (
                        <option key={index} value={index}>
                            {el.title}
                        </option>
                    ))}
                </LanguagePicker>
            </Container>
        )
    }
}

export default EvysCodeMirror
