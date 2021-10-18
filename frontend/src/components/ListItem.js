import Tilt from 'react-tilt'
let colors=["rgb(185, 185, 185,0.8)","rgb(143, 143, 143,0.8)"]

export default function ListItem({text,index}) {
    return (
        <Tilt options={{axis:'x',max:15}}>
            <div className="list-item flex-row" style={{backgroundColor:colors[index%2]}} >
                <div className="index center" style={{alignItems:"center"}}>
                    <span> {index+1}</span>
                </div> 
                <span>{text}</span>
            </div>
        </Tilt>
        
    )
}
