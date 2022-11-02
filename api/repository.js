// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default $axios => resource => ({
    index(parameters) {
      return $axios.$get(`${resource}?${parameters}`)
    },
  
    show(id) {
      return $axios.$get(`${resource}/${id}`)
    },

    showSlug(slug, parameters) {
      return $axios.$get(`${resource}?filters[slug][$eq]=${slug}&${parameters}`)
    },
  
    create(payload) {
      return $axios.$post(`${resource}`, payload)
    },
  
    update(id, payload) {
      return $axios.$post(`${resource}/${id}`, payload)
    },
  
    delete(id) {
      return $axios.$delete(`${resource}/${id}`)
    }
  })
  