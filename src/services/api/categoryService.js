import categoriesData from "@/services/mockData/categories.json";

class CategoryService {
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...categoriesData]);
      }, 200);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const category = categoriesData.find(cat => cat.id === id);
        if (category) {
          resolve({ ...category });
        } else {
          reject(new Error(`Category with id ${id} not found`));
        }
      }, 150);
    });
  }
}

export default new CategoryService();