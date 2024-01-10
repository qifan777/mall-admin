<script lang="tsx">
import { defineComponent } from 'vue'
import { ElIcon, ElMessage, ElUpload, type UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { Result } from '@/typings'

export default defineComponent({
  props: {
    modelValue: { type: String, default: '' }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleImageSuccess: UploadProps['onSuccess'] = (response: Result<{ url: string }>) => {
      emit('update:modelValue', response.result.url)
    }
    const types = ['image/png', 'image/jpeg']

    const beforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
      if (!types.includes(rawFile.type)) {
        ElMessage.error('Image picture must be JPG format!')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Image picture size can not exceed 2MB!')
        return false
      }
      return true
    }
    return () => (
      <ElUpload
        beforeUpload={beforeImageUpload}
        onSuccess={handleImageSuccess}
        action={'/mall-api/oss/upload'}
        showFileList={false}
        class="image-uploader"
      >
        {props.modelValue ? (
          <img
            alt="图片"
            src={props.modelValue}
            style={{ objectFit: 'cover', width: '120px', height: '120px', display: 'block' }}
          />
        ) : (
          <ElIcon class="image-uploader-icon">
            <Plus />
          </ElIcon>
        )}
      </ElUpload>
    )
  }
})
</script>

<style scoped>
.image-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.image-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}
</style>
