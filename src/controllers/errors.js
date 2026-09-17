const testErrorPage = async (req, res) => {
    throw new Error('Test error');
}

export { testErrorPage }