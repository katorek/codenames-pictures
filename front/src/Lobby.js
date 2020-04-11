import React, {Component} from "react";
import Api from './Api'
import {Trans, withTranslation} from "react-i18next";
import './Lobby.css'
import PropTypes from 'prop-types';

// default withTranslation()(ImageLinkStatusComponent);

class ImageLinkStatusComponent extends Component {
    render() {
        const { t } = this.props;
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


let endpoint = 'http://localhost:9000';

class Lobby extends Component {

    // const [state, setState] = useReducer(
    //     (state, newState) => ({...state, ...newState}),
    //     {gameID: '', gameSelected: ''}
    // );

    getInitialState = () => {
        return {
            newGameName: this.props.defaultGameID,
            selectedGame: null,
            newGameImagesLinkGood: null,
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

        this.setState({newGameImagesLinkGood: null});

        Api.post(
            '/game/' + this.state.newGameName,
            {"newGameImagesLink": this.state.newGameImagesLink},
        ).then(game => {
            if (process.env.NODE_ENV !== "production") {
                game = game.data;
                console.log(game);
            }
            this.setState({
                newGameName: '',
                selectedGame: game,
                newGameImagesLinkGood: true,
                newGameImagesLink: '',
            });

            if (this.props.gameSelected) {
                this.props.gameSelected(game);
            }
        }).catch(() => {
            this.setState({newGameImagesLinkGood: false});
        });
    };


    updateText(text) {
        // this.state.ap
        this.setState({
            newGameImagesLink: text,
        })
    }

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    //
    // componentDidMount() {
    //     this.getTask();
    // }
    //
    // onChange = event => {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    // };
    //
    // onSubmit = () => {
    //     let { task } = this.state;
    //     // console.log("pRINTING task", this.state.task);
    //     if (task) {
    //         Api
    //             .post(
    //                 endpoint + "/api/task",
    //                 {
    //                     task
    //                 },
    //                 {
    //                     headers: {
    //                         "Content-Type": "application/x-www-form-urlencoded"
    //                     }
    //                 }
    //             )
    //             .then(res => {
    //                 this.getTask();
    //                 this.setState({
    //                     task: ""
    //                 });
    //                 console.log(res);
    //             });
    //     }
    // };
    //
    // getTask = () => {
    //     Api.get(endpoint + "/api/task").then(res => {
    //         console.log(res);
    //         if (res.data) {
    //             this.setState({
    //                 items: res.data.map(item => {
    //                     let color = "yellow";
    //
    //                     if (item.status) {
    //                         color = "green";
    //                     }
    //                     return (
    //                         <Card key={item._id} color={color} fluid>
    //                             <Card.Content>
    //                                 <Card.Header textAlign="left">
    //                                     <div style={{ wordWrap: "break-word" }}>{item.task}</div>
    //                                 </Card.Header>
    //
    //                                 <Card.Meta textAlign="right">
    //                                     <Icon
    //                                         name="check circle"
    //                                         color="green"
    //                                         onClick={() => this.updateTask(item._id)}
    //                                     />
    //                                     <span style={{ paddingRight: 10 }}>Done</span>
    //                                     <Icon
    //                                         name="undo"
    //                                         color="yellow"
    //                                         onClick={() => this.undoTask(item._id)}
    //                                     />
    //                                     <span style={{ paddingRight: 10 }}>Undo</span>
    //                                     <Icon
    //                                         name="delete"
    //                                         color="red"
    //                                         onClick={() => this.deleteTask(item._id)}
    //                                     />
    //                                     <span style={{ paddingRight: 10 }}>Delete</span>
    //                                 </Card.Meta>
    //                             </Card.Content>
    //                         </Card>
    //                     );
    //                 })
    //             });
    //         } else {
    //             this.setState({
    //                 items: []
    //             });
    //         }
    //     });
    // };
    //
    // updateTask = id => {
    //     Api
    //         .put(endpoint + "/api/task/" + id, {
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded"
    //             }
    //         })
    //         .then(res => {
    //             console.log(res);
    //             this.getTask();
    //         });
    // };
    //
    // undoTask = id => {
    //     Api
    //         .put(endpoint + "/api/undoTask/" + id, {
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded"
    //             }
    //         })
    //         .then(res => {
    //             console.log(res);
    //             this.getTask();
    //         });
    // };
    //
    // deleteTask = id => {
    //     Api
    //         .delete(endpoint + "/api/deleteTask/" + id, {
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded"
    //             }
    //         })
    //         .then(res => {
    //             console.log(res);
    //             this.getTask();
    //         });
    // };
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
                               onChange={this.newGameTextChange} value={this.state.newGameName || 'test'}/>
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
                        <br />
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

        // return (
        //     <div>
        //         <div className="row">
        //             <Header className="header" as="h2">
        //                 {t('a')}
        //             </Header>
        //         </div>
        //         <div className="row">
        //             <Form onSubmit={this.onSubmit}>
        //                 <Input
        //                     type="text"
        //                     name="task"
        //                     onChange={this.onChange}
        //                     value={this.state.task}
        //                     fluid
        //                     placeholder="Create Task"
        //                 />
        //                 {/* <Button >Create Task</Button> */}
        //             </Form>
        //         </div>
        //         <div className="row">
        //             <Card.Group>{this.state.items}</Card.Group>
        //         </div>
        //     </div>
        // );
    }
}

Lobby.propTypes = {
    gameSelected: PropTypes.func,
    defaultGameID: PropTypes.string
};

export default withTranslation()(Lobby);