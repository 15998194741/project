()=> {
  this.$confirm('是否继续2222?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })




    .then(() => {
      let serverCreateStatus = servercreate({ ...this.createForm, 'gamename': this.gamename, 'gameid': this.gameid }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '创建成功!'
          });
          this.$refs[formName].resetFields();
          return Promise.resolve(true);
        } else {
          this.$message({
            type: 'warning',
            message: '创建失败!'
          });
          return Promise.resolve(false);
        }
      }
    
    
      ).catch((error) => {
      });
      return Promise.resolve(serverCreateStatus);
    });
};
