import createRepository from '~/api/repository'
const apiU = 'http://fapra.supptor.com/api/'
export default (ctx, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const repositoryWithAxios = createRepository(ctx.$axios)
  inject('postRepository', repositoryWithAxios(apiU + 'posts'));
  inject('pageRepository', repositoryWithAxios(apiU + 'pages'));
  inject('featuredPostRepository', repositoryWithAxios(apiU + 'featured-post'));
  inject('mainPageRepository', repositoryWithAxios(apiU + 'main-page'));
  inject('categoryRepository', repositoryWithAxios(apiU + 'categories'));
  inject('supplierRepository', repositoryWithAxios(apiU + 'suppliers'));



  // You can reuse the repositoryWithAxios object:
  // inject("userRepository", repositoryWithAxios('/users'));
}
