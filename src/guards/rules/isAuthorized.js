export const isAuthorized = (async (resolve, root, args, context, info) => {
    if (!context.id) {
        throw new Error('Not authenticated');
    }

    return resolve(root, args, context, info);
})