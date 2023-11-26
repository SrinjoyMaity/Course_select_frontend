import { useState } from "react";

function Display(props) 
{
    
    const [checkstate, Setcheckstate]=useState(Array(100).fill(false));
    const [number, Setnumber]=useState(0);
    const [subm, setSub] =useState(0);



    if(props.course==null)
    {
        return;
    }
    let cour=props.course;
    console.log(cour);
    if(props.preq==null)
    {
        return;
    }
    let pre=props.preq;
    console.log(pre[1]);

    
    let courMap=new Array(cour.length);
    cour.map((title ,index)=>(
        courMap[index]=title.courseID
     ))

    let check=checkstate;

    const handleChange=(event)=>
    {
        if(checkstate[event.target.value]===false)
        {
            Setnumber(number+1)
            check[event.target.value]=!check[event.target.value];
        }
        else
        {
            Setnumber(number-1)
            check[event.target.value]=!check[event.target.value];
        }
       
       Setcheckstate(check)
    }
    
    const handleSubmit=(e)=>
    {
        let ans =false;
        if(number<4)
        {
            e.preventDefault();
        }
        else
        {
            for(var i=0; i< pre.length;i++)
            {
                if(checkstate[courMap.indexOf(pre[i].courseID.courseID)] && checkstate[courMap.indexOf(pre[i].preq.courseID)]===false)
                {
                    ans = true;
                }
            }
            if(ans)
            {
                alert(`All Prerequisites not fulfilled for all course`)
                e.preventDefault();
            }
            else
            {
                let output=[];
                for( i=0; i< cour.length;i++)
                {
                    if(checkstate[i]===true)
                    {
                        output.push(cour[i]);
                    }
                } 
                console.log(JSON.stringify(output));

                fetch(`http://localhost:8080/Courseselect-1.0/api/Courses/post`, {
                    method: 'POST' ,
                    mode: 'cors',
                    body: JSON.stringify(output)
                })
                e.preventDefault();
                setSub(1);
            }
        }

    }
if(subm===0)
{
  return (
    <div>
    <form onSubmit={handleSubmit}>
     <table>
        <thead>
            <th></th>
            <th>COURSES:</th>
            <th>FACULTY:</th>
            <th>COURSECODE:</th>
            <th>CREDITS</th>
            <th>TERM:</th>
            <th>YEAR:</th>
            <th>CAPACITY:</th>
            <th>PREREQUISITE:</th>
        </thead>
        {cour.map((title, index)=>(
            <tbody key={index}>
                <td><input type="checkbox" value={index}  checked={checkstate[index]} disabled={number>=6 && !checkstate[index]} onChange= {handleChange}/></td>
                    <td> {title.name} </td>
                    <td> {title.faculty} </td>
                    <td>{title.courseCode} </td>
                    <td> {title.credit} </td>
                    <td>{title.term} </td>
                    <td> {title.year} </td>
                    <td> {title.capacity} </td>
                    <td>
                        {pre.map(({id,courseID,preq})=>(
                           <PreReq title={title.courseID} cou={courseID.courseID} preq={preq.name}/>
                        ))}
                    </td>
                </tbody>
        ))}
     </table>
    <span>
        <h1>{number}/6</h1>
        <input type="submit" value="Submit" />
    </span>
    </form>
    </div>
  )
}
else
{
    return (
    <h4>Your choices have been submitted</h4>
    )
}
}

function PreReq(props)
{
    if(props.title === props.cou)
    {
       return <span>  * {props.preq}</span>
    }
}

export default  Display;