export default function Checkbox(props)
{
    return (
        <div>
            <input type="checkbox"/>
            <span>COURSE: {props.data.name}</span>
            <span>FACULTY: {props.data.faculty}</span>
            <span>COURSECODE: {props.data.courseCode}</span>
            <span>CREDITS: {props.data.credit}</span>
            <span>TERM: {props.data.term}</span>
            <span>YEAR: {props.data.year}</span>
            <span>CAPACITY: {props.data.capacity}</span>
        </div>
    );
}