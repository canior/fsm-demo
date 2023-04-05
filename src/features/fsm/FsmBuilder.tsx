import React from 'react';
import {useAppSelector} from "../../app/hooks"
import {selectFsmBuilder} from "./redux/fsmBuilderSlice";
import LazyLoad from 'react-lazyload';
import AddValues from "./components/AddValues";
import AddStates from "./components/AddStates";
import AddTransitions from "./components/AddTransitions";
import AddCurrentState from "./components/AddCurrentState";
import AddInputs from "./components/AddInputs";
import './assets/FsmBuilder.styles.scss';
import './assets/Form.styles.scss';

const FsmBuilder = () => {
    const currentFsmBuilder = useAppSelector(selectFsmBuilder);

    return (
        <main>
            <div className="form-wrapper">
                <h2 className="text-center">
                    Finite State Machine Builder
                </h2>
                <section>
                    {/* When adding/removing components, update the progress bar below */}
                    <LazyLoad once>
                        <div className="progressbar">
                            <div
                                className={currentFsmBuilder.stage === 0 ? 'progress-step progress-step-active' : 'progress-step'}
                                data-title="Values"></div>
                            <div
                                className={currentFsmBuilder.stage === 1 ? 'progress-step progress-step-active' : 'progress-step'}
                                data-title="States"></div>
                            <div
                                className={currentFsmBuilder.stage === 2 ? 'progress-step progress-step-active' : 'progress-step'}
                                data-title="Transitions"></div>
                            <div
                                className={currentFsmBuilder.stage === 3 ? 'progress-step progress-step-active' : 'progress-step'}
                                data-title="Inputs"></div>
                            <div
                                className={currentFsmBuilder.stage === 4 ? 'progress-step progress-step-active' : 'progress-step'}
                                data-title="Done"></div>
                        </div>
                    </LazyLoad>

                    <div className="page-wrapper">
                        {
                            <LazyLoad once>
                                <div className="wrap">
                                    <p>
                                        FsmBuilder Json
                                    </p>
                                    <div className="code-output">
                                        <pre>
                                            {JSON.stringify(currentFsmBuilder)}
                                        </pre>
                                    </div>

                                    <p>
                                        Current State
                                    </p>
                                    <div className="code-output">
                                        <pre>
                                            {JSON.stringify(currentFsmBuilder.currentFsmState)}
                                        </pre>
                                    </div>

                                    <p>
                                        Inputs:
                                    </p>
                                    <div className="code-output">
                                        <pre>
                                            {JSON.stringify(currentFsmBuilder.fsmInputs)}
                                        </pre>
                                    </div>

                                    <p>
                                        Outputs:
                                    </p>
                                    <div className="code-output">
                                        <pre>
                                            {JSON.stringify(currentFsmBuilder.fsmOutputs)}
                                        </pre>
                                    </div>

                                    {currentFsmBuilder.errors.map((input, index) => (
                                        <div className="error-message" key={index}>{input}</div>
                                    ))}
                                </div>
                            </LazyLoad>
                        }
                        {(currentFsmBuilder.stage === 0) &&
                            <LazyLoad once>
                                <div className="wrap">
                                    <AddValues/>
                                </div>
                            </LazyLoad>
                        }

                        {(currentFsmBuilder.stage === 1) &&
                            <LazyLoad once>
                                <div className="wrap">
                                    <AddStates/>
                                </div>
                            </LazyLoad>
                        }

                        {(currentFsmBuilder.stage === 2) &&
                            <LazyLoad once>
                                <div className="wrap">
                                    <AddTransitions/>
                                </div>
                            </LazyLoad>
                        }

                        {(currentFsmBuilder.stage === 3) &&
                            <LazyLoad once>
                                <div className="wrap">
                                    <AddCurrentState/>
                                </div>
                            </LazyLoad>
                        }

                        {(currentFsmBuilder.stage === 4) &&
                            <LazyLoad once>
                                <div className="wrap">
                                    <AddInputs/>
                                </div>
                            </LazyLoad>
                        }
                    </div>
                </section>
            </div>
        </main>

    );
};

export default FsmBuilder;
