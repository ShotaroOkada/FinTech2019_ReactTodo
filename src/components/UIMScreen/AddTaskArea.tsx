import * as React from 'react'
import { progressNames } from 'src/states/Progress';
import { useDispatch } from 'react-redux';
import { areaNames } from 'src/states/Area';
import { addTaskArguments } from 'src/actions/Tasks/Action';
import { addTask } from 'src/actions/Tasks/ActionCreator';

const { useState } = React;

export default function AddTask() {

    const dispatch = useDispatch();
    const [inputAddTask, setInputaddTask] = useState('');
    const [selectedArea, setSelectedArea] = useState('doFirst');
    
    // タスク追加フォームのイベント
    function onInputAddTaskChange(event: React.FormEvent<HTMLInputElement>) {
        setInputaddTask(event.currentTarget.value);
    };

    // タスク追加ボタンのイベント
    function submitNewTask() {
        if (inputAddTask === '') {
            return;
        }
        const addTaskObject: addTaskArguments = {
            taskName: inputAddTask,
            areaName: selectedArea,
        }
        dispatch(addTask(addTaskObject));
        setInputaddTask('');
    }

    // タスクを配置するエリアを選択するためのラジオボタン 
    function selectAreaRatio() {
        const areaIcons = ['☀', '🌈', '☁', '☔']
        return (
            <div key='selectAreaRatio'>
                {
                    areaIcons.map((areaIcon, index: number) => {
                        const setSelectedAreaCall = () => setSelectedArea(areaNames[index]);
                        const id = (selectedArea === areaNames[index]) ? 'selectedAreaIcon' : 'nonSelectedAreaIcon'
                        return (
                            <span key={index}>
                                <span id={id} onClick={setSelectedAreaCall}>{areaIcon}</span>
                                &nbsp;
                              </span>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div id="addTaskArea">
            <span id="appTitle">Urgent Important Matrix Todo</span>
            <br />
            {progressNames.map(progressName => {
                return <span key={progressName} id={`${progressName}Info`}>{progressName}</span>
            })}
            <div id='addTaskComponents'>
                <input type="text" placeholder='task name' value={inputAddTask} onChange={onInputAddTaskChange}/>
                <button id="mouseYubi" onClick={submitNewTask}>+</button>
                {selectAreaRatio()}
            </div>
        </div>
    )
}