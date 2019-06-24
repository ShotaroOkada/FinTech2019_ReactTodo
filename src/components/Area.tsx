import * as React from 'react'
import '../styles/Area.css'
import IOneTask from 'src/states/oneTask';
import { areaNames } from 'src/states/AreaName';
import { progressLayout } from 'src/states/progressLayout';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask, deleteTask } from 'src/actions/ChangeTaskQuantity/ChangeTaskQuantityActionCreator';
import { toProgress } from 'src/actions/ChangeDisplay/ChangeDisplayActionCreator';
import IState from 'src/states';

const { useState } = React;

export default function Area() {
    const dispatch = useDispatch();
    const [inputAddTask, setInputaddTask] = useState('');
    const [selectedArea, setSelectedArea] = useState(0);
    const allTasks = useSelector((state: IState) => state.allTasks)
    const areaTasks = [allTasks.area0Tasks, allTasks.area1Tasks, allTasks.area2Tasks, allTasks.area3Tasks]
    
    // タスク追加フォームのイベント
    function onInputAddTaskChange(event: React.FormEvent<HTMLInputElement>) {
        setInputaddTask(event.currentTarget.value);
    };

    // タスク追加ボタンのイベント
    function submitNewTask() {
        if (inputAddTask === '') {
            return;
        }
        const createAddtaskObject: IOneTask = {
            name: inputAddTask,
            area: selectedArea,
            progress: 0
        }
        dispatch(addNewTask(createAddtaskObject));
        setInputaddTask('');
    }

    // タスクを配置するエリアを選択するためのラジオボタン 
    function selectAreaRatio() {
        const areaIcons: string[] = ['☀', '🌈', '☁', '☔']
        return (
            <div key='selectAreaRatio'>
                {
                    areaIcons.map((areaIcon, index: number) => {
                        return (
                          <span key={index}>
                            <input key={index} type="radio" name="area" value={index} checked={selectedArea === index}
                                onChange={() => setSelectedArea(index)} />
                            {areaIcon}
                            &nbsp;
                          </span>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div id="areaContainer">
            <div id="addTaskArea">
                <div id="appTitle">Urgent Important Matrix</div>
                <br />
                <div id='addTaskComponents'>
                    <input
                        type="text"
                        value={inputAddTask}
                        onChange={onInputAddTaskChange}
                    />
                    <button onClick={submitNewTask}>+</button>
                    {selectAreaRatio()}
                </div>
            </div>
            {areaTasks.map((areaTask, areaIndex) => {
                return (
                    <div id={`area${areaIndex}`} key={`area${areaIndex}`}>
                        <div id="title" onClick={() => dispatch(toProgress(areaIndex))}>{areaNames[areaIndex]}</div>
                        {areaTask.length !== null &&
                            areaTask.map((task, taskIndex) => {
                                return <div key={task.name} id={progressLayout[task.progress]}>
                                    {task.name} <span key={`dast${task.name}`} onClick={() => dispatch(deleteTask(areaIndex, taskIndex))}>🗑️</span>
                                </div>
                            })
                        }
                    </div>
                )
            })}
        </div>
    )
}