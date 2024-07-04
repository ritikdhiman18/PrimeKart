const Title = (props) => {
    const { children } = props;
    return (
        <>
            <div className="my-4 text-center font-bold text-3xl">
                {children}
            </div>
        </>
    );
}

export default Title;