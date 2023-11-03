function ViewEvent(props: {eventId: string, type: string}) {
    return (<div>
        {props.eventId} {props.type}
    </div>)
}

export default ViewEvent;

// <ViewEvent type={e.isBehavioral ? `behavioral` : `clinic`} />