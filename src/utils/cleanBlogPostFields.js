module.exports = (blogPosts) => {
    const processedBlogPosts = blogPosts.map((blogPost) => {
        const categories = blogPost.get('categories').map((category) => {
            const { PostCategory, ...categoryData } = category.get();
            return categoryData;
        });
            return {
                ...blogPost.get(),
                categories,
            };
        });

        return processedBlogPosts;
};