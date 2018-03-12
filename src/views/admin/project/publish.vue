<template>
  <div class="page-view" style="padding-bottom:0;">
    <div class="page-title">
      <ul class="row w h">
        <li class="col v-m g-4">发布项目</li>
        <li class="col v-m t-r">
          <el-button @click="submit" type="primary" size="small" round>确认发布</el-button>
        </li>
      </ul>
    </div>
    <div class="admin-main" style="overflow:auto;">
      <el-form label-width="100px" style="margin-top:20px;">
        <el-row>
          <el-col :span="18">
            <el-form-item label="项目名称：">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="标签：">
              <el-tag
                :key="tag"
                style="margin-right:5px;"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                style="width:6em;"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">新增标签</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="所属项目：">
              <el-select style="width:100%;"  v-model="form.branch"  placeholder="请选择" @change = "filterCategory">
                <el-option
                  v-for="(item, index) in branch"
                  :key="index"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分类：">
              <el-select style="width:100%;" v-model="form.category" placeholder="请选择">
                <el-option
                  v-for="(item, index) in category"
                  :key="index"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="github：">
              <el-input style="width:100%;" v-model="form.github"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="封面：">
              <el-upload
                class="cover"
                list-type="picture"
                accept="image/*"
                :on-success="coverSuccess"
                :on-remove="delFile"
                :file-list="cover"
                :action="upfile">
                <el-button class="v-m" size="small" type="primary">点击上传</el-button>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="附件：">
              <el-upload
                multiple
                class="attach"
                :action="upfile"
                :on-success="attachSuccess"
                :on-remove="delFile"
                :file-list="attach">
                <el-button class="v-m" size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="项目描述：">
              <quill-editor
                style="height:400px"
                :options="editorOption"
                v-model="form.content">
              </quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from 'axios'
import {upfile, delfile, addProject, ProjectCategory} from '@/config'
import { quillEditor, Quill } from 'vue-quill-editor'
import {ImageDrop} from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)
export default {
  name: 'addProject',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '发布项目',
      branch: [],
      category: [],
      upfile: upfile,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      cover: [],
      attach: [],
      form: {
        title: '',
        author: JSON.parse(this.$localStorage.get('userInfo')).uId,
        tag: '',
        branch: '',
        category: '',
        attach: '',
        github: '',
        content: '',
        cover: ''
      },
      editorOption: {
        placeholder: '请填写项目正文描述！',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'direction': 'rtl'}],
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            [{'font': []}],
            [{'color': []}, {'background': []}],
            [{'align': []}],
            ['clean'],
            ['link', 'image', 'video']
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {}
        }
      }
    }
  },
  components: {
    quillEditor
  },
  created () {
    this.getProjectCategory()
  },
  methods: {
    submit () {
      this.getattach()
      this.form.tag = this.form.tag.substring(0, this.form.tag.lastIndexOf(','))
      var formData = new FormData()
      formData.append('uId', JSON.parse(this.$localStorage.get('userInfo')).uId)
      formData.append('projectInfo', JSON.stringify(this.form))
      axios({
        method: 'post',
        url: addProject,
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.data.status) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        }
      })
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
        this.form.tag = ''
        this.dynamicTags.forEach((item) => {
          this.form.tag += item + ','
        })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    coverSuccess (res, file, fileList) {
      if (this.cover.length) {
        axios({
          methods: 'get',
          url: delfile,
          params: {
            url: this.cover[0].name
          }
        }).then(res => {
        })
      }
      this.cover = []
      if (res.status) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.cover.push(res.data)
        this.form.cover = JSON.stringify(this.cover[0])
      }
    },
    attachSuccess (res, file, fileList) {
      this.attach = fileList
    },
    getattach () {
      var newattach = []
      this.attach.forEach(item => {
        newattach.push(item.response.data)
      })
      newattach.forEach((item, index) => {
        newattach[index] = JSON.stringify(item)
      })
      this.form.attach = newattach.join('-')
    },
    delFile (file, fileList) {
      axios({
        methods: 'get',
        url: delfile,
        params: {
          url: file.name
        }
      }).then(res => {
        console.log(res)
        if (res.data.status) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        }
      })
    },
    getProjectCategory () {
      axios({
        methods: 'get',
        url: ProjectCategory
      }).then(res => {
        if (Object.prototype.toString.call(res.data.data) === '[object Array]') {
          this.branch = res.data.data
        } else {
          this.branch.push(res.data.data)
        }
        console.log(this.branch)
      })
    },
    filterCategory (current) {
      this.branch.forEach(item => {
        if (item.value === current) {
          this.category = item.children
        }
      })
    }
  }
}
</script>
<style lang="scss">
.v-m{
  vertical-align:middle;
}
.el-upload__tip{
  display:inline-block;
  margin-left:20px;
}
.quill-editor{
  .ql-snow{
    border:1px solid #DCDFE6;
    .ql-picker-label{
      &:before, svg{
        position: absolute;
      }
    }
  }
}
</style>
