const CapabilityListItem = (data) => {
    const capability = data.capability;
    let parent;
    if(capability.parent != null) {
        parent = <h1>{capability.parent.name}</h1>
    }

    return (
        <li>
            <h1>{capability.name} - {capability.level}</h1>
            <p>{capability.description}</p>
            {parent}
        </li>
    )
}

export default CapabilityListItem;