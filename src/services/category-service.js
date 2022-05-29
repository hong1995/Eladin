import { categoryModel } from '../db';

class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    // 카테고리 추가
    async addCategory(categoryName) {
        const createdNewCategory = await this.categoryModel.create(categoryName);

        return createdNewCategory;
    }

    // 전체 카테고리 조회
    async getCategories() {
        const categories = await this.categoryModel.findAll();
        return categories;
    }

    // 카테고리명으로 조회
    async getCategoryByName(categoryName) {
        // 우선 해당 이름의 카테고리가 db에 존재하는지 확인 존재하지 않으면 생성
        const category = await this.categoryModel.findByCategory(categoryName);
        if (!category) {
            const createdNewCategory = await this.categoryModel.create(categoryName);
            return createdNewCategory;
        }

        return category;
    }

    // 카테고리명 수정
    async setCategory(categoryId, update) {
        const category = await this.categoryModel.update({ categoryId, update })

        return category
    }
    // 카테고리명 삭제
    async deleteCategory(categoryId) {
        const category = await this.categoryModel.delete(categoryId)

        return category
    }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };