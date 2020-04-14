import React, {Component} from "react";
import Api from './Api'
import {Trans, withTranslation} from "react-i18next";
import './Lobby.css'
import PropTypes from 'prop-types';

class ImageLinkStatusComponent extends Component {
    render() {
        const {t} = this.props;
        if (this.props.good == null) {
            return <p className="message"/>;
        }
        if (this.props.good === true) {
            return <p className="message good">{t('lobby.image-link.good')}</p>;
        }
        if (this.props.good === false) {
            return <p className="message bad">{t('lobby.image-link.bad')}</p>;
        }
    }

}

const ImageLinkStatus = withTranslation()(ImageLinkStatusComponent);

class Lobby extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newGameName: this.props.defaultGameID,
            selectedGame: null,
            newGameImagesLinkGood: null,
            newGameImagesLink: null,
        };
    }


    getInitialState = () => {
        return {
            newGameName: this.props.defaultGameID,
            selectedGame: null,
            newGameImagesLinkGood: null,
            newGameImagesLink: null,
        };
    };

    newGameTextChange = (e) => {
        this.setState({newGameName: e.target.value});
    };

    newGameImagesLinkChange = (e) => {
        this.setState({newGameImagesLink: e.target.value});
    };

    setSt = (state) => {
        this.setState(state)
    };

    handleNewGame = (e) => {
        e.preventDefault();
        if (!this.state.newGameName) {
            return;
        }
        console.log("handleNewGame");
        // console.log(JSON.stringify({newGameImagesLink: this.state.newGameImagesLink}));

        this.setState({newGameImagesLinkGood: null});

        Api.post(
            '/game/' + this.state.newGameName,
            {
                newGameImagesLink: this.state.newGameImagesLink
            }
        ).then(response => {
            var game = response.data;
            this.setState({
                newGameName: '',
                selectedGame: game,
                newGameImagesLinkGood: true,
                newGameImagesLink: this.state.newGameImagesLink,
            }, () => {
                if (this.props.gameSelected) {
                    this.props.gameSelected(game);
                }
            });


        }).catch(() => {
            this.setState({newGameImagesLinkGood: false});
        });
    };


    updateText(text) {
        this.setState({
            newGameImagesLink: text,
        })
    }

    //
    render() {
        const {t} = this.props;

        return (
            <div id="lobby">
                <div id="available-games">
                    <form id="new-game">
                        <p className="intro">
                            {t('lobby.intro')}
                        </p>
                        <input type="text" id="game-name" autoFocus
                               onChange={this.newGameTextChange} value={this.state.newGameName || ''}/>
                        <button onClick={this.handleNewGame}>{t('lobby.play')}</button>
                        <p className="intro">
                            {t('lobby.customImages.part1')}
                            <a href="https://github.com/banool/codenames-pictures#loading-up-images">
                                {t('lobby.customImages.githubLink')}
                            </a>
                            {t('lobby.customImages.part2')}
                        </p>
                        <p>{t('lobby.mods.head')}</p>
                        <table>
                            <tbody>
                            <tr>
                                <th>{t('lobby.mods.code')}</th>
                                <th>{t('lobby.mods.description')}</th>
                            </tr>

                            <tr>
                                <td><code>{t('lobby.mods.mods.0.code')}</code></td>
                                <td><p>{t('lobby.mods.mods.0.description')}</p></td>
                                {/*<td><button onClick={() => this.updateText(t('lobby.mods.mods.0.code'))}>{t('lobby.play')}</button></td>*/}
                            </tr>
                            <tr>
                                <td><code>{t('lobby.mods.mods.1.code')}</code></td>
                                <td><p>{t('lobby.mods.mods.1.description')}</p></td>
                                {/*<td><button onClick={() => this.updateText(t('lobby.mods.mods.1.code'))}>{t('lobby.play')}</button></td>*/}
                            </tr>
                            <tr>
                                <td><code>{t('lobby.mods.mods.2.code')}</code></td>
                                <td><p>{t('lobby.mods.mods.2.description')}</p></td>
                                {/*<td><button onClick={() => this.updateText(t('lobby.mods.mods.2.code'))}>{t('lobby.play')}</button></td>*/}
                            </tr>
                            </tbody>
                        </table>
                        <br/>
                        <p><Trans i18nKey={"lobby.mods.default"}>Default mode is <strong>mix</strong></Trans>
                            <br/>
                            {t('lobby.mods.default2')}
                        </p>
                        <input className="full" type="text" id="user-images"
                               placeholder={t('lobby.image-link.placeholder')}
                               onChange={this.newGameImagesLinkChange} value={this.state.newGameImagesLink || ''}/>
                    </form>
                    <br/>
                    <p>{t('lobby.enjoying-game')}</p>
                    <ImageLinkStatus good={this.state.newGameImagesLinkGood}/>
                </div>
            </div>
        );

    }
}

Lobby.propTypes = {
    gameSelected: PropTypes.func,
    defaultGameID: PropTypes.string
};

export default withTranslation()(Lobby);